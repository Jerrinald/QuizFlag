<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Controller\BestScoreController;
use App\Controller\CheckBestScoreController;
use App\Controller\FindUserByResetTokenController;
use App\Controller\ForgotPasswordController;
use DateTimeImmutable;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: '`user`')]
#[ApiResource(
    denormalizationContext: ['groups' => ['user:write']],
    normalizationContext: ['groups' => ['user:read']],
    operations: [
        new Post(),
        new Post(
            uriTemplate: '/create-user',
            security: 'is_granted("USER_POST", object)',
            securityPostDenormalize: 'is_granted("USER_POST", object)',
        ),
        new Post(
            denormalizationContext: ['groups' => ['forgot:write']],
            uriTemplate: '/forgot-pass',
            controller: ForgotPasswordController::class . '::forgotPassword',
        ),
        new Get(),
        new GetCollection(),
        new GetCollection(
            uriTemplate: '/usersRank',
            name: 'users_rank'
        ),
        new Patch(
            security: 'is_granted("USER_EDIT", object)',
            securityPostDenormalize: 'is_granted("USER_EDIT", object) and (previous_object.getRoles() == object.getRoles() or is_granted("USER_EDIT_ROLES"))',
        ),
        new Patch(
            denormalizationContext: ['groups' => ['score:write']],
            uriTemplate: '/edit-best-score',
            controller: BestScoreController::class . '::__invoke',
            security: 'is_granted("ROLE_USER")', // Ensure only logged-in users can update
            name: 'edit_best_score'
        ),
        new Delete(
            security: 'is_granted("USER_DELETE", object)',
            securityPostDenormalize: 'is_granted("USER_DELETE", object)',
        ),
    ],

)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column(type: 'integer')]
    #[Groups(['user:read:full'])]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Groups(['user:read', 'user:write'])]
    private string $username;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Groups(['user:write', 'forgot:write', 'user:read:full', 'owner:read'])]
    private string $email;

    #[ORM\Column(type: 'integer', nullable: true)]
    #[Groups(['user:read', 'user:read:full', 'owner:read'])]
    private ?int $bestScore =  null;

    /** @var string The hashed password */
    #[ORM\Column]
    private string $password = '';

    #[Groups(['user:write',])]
    private ?string $plainPassword = null;

    #[Groups(['user:read:full', 'owner:read', 'user:write'])]
    #[ORM\Column]
    private array $roles = [];

    #[ORM\Column(nullable: true)]
    private ?string $resetToken = null;

    #[Groups(['score:write'])]
    private ?string $encryptedBestScore = null;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $resetTokenExpiresAt = null;

    public function __construct()
    {
        $this->createdAt = new DateTimeImmutable();
        $this->setBestScore(0);

    }


    #[ApiFilter(DateFilter::class)]
    #[ORM\Column]
    private DateTimeImmutable $createdAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;
        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getBestScore(): ?int
    {
        return $this->bestScore;
    }

    public function setBestScore(int $bestScore): self
    {
        $this->bestScore = $bestScore;
        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;
        return $this;
    }

    public function setPlainPassword(?string $plainPassword): void
    {
        $this->plainPassword = $plainPassword;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    /** @see UserInterface */
    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    /** @see UserInterface */
    public function getRoles(): array
    {
        $roles = $this->roles;
        //$roles[] = 'ROLE_USER'; // guarantee every user at least has ROLE_USER

        return array_unique($roles);
    }

    public function getUsernameOrEmail(): string
    {
        return $this->email ?? $this->username;
    }

    public function setRoles(array $roles): void
    {
        $this->roles = $roles;
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTimeImmutable $createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    /** @see UserInterface */
    public function eraseCredentials(): void
    {
        $this->plainPassword = null;
    }

    public function getResetToken(): ?string
    {
        return $this->resetToken;
    }

    public function setResetToken(?string $resetToken): self
    {
        $this->resetToken = $resetToken;
        return $this;
    }

    public function getEncryptedBestScore(): ?string
    {
        return $this->encryptedBestScore;
    }

    public function setEncryptedBestScore(?string $encryptedBestScore): self
    {
        $this->encryptedBestScore = $encryptedBestScore;
        return $this;
    }

    public function getResetTokenExpiresAt(): ?\DateTimeInterface
    {
        return $this->resetTokenExpiresAt;
    }

    public function setResetTokenExpiresAt(?\DateTimeInterface $resetTokenExpiresAt): self
    {
        $this->resetTokenExpiresAt = $resetTokenExpiresAt;
        return $this;
    }
}
