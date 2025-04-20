<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use DateTimeImmutable;

use Doctrine\ORM\Mapping as ORM;

// #[ORM\Entity]
// #[ORM\Table(name: '`quizSession`')]
// #[ORM\HasLifecycleCallbacks]
// #[ApiResource(
//     denormalizationContext: ['groups' => ['quizSession:write']],
//     normalizationContext: ['groups' => ['quizSession:read']],
//     operations: [
//         new Post(), // Create new QuizSession (start quiz)
//         new GetCollection(), // Fetch active quiz sessions
//     ],
// )]
class QuizSession
{
    // #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    // private ?int $id = null;

    // #[ORM\ManyToOne(targetEntity: User::class)]
    // #[ORM\JoinColumn(nullable: false)]
    // private User $user;

    // #[ORM\Column(type: 'string', unique: true)]
    // private string $sessionToken;

    // #[ORM\Column(type: 'datetime_immutable')]
    // private \DateTimeImmutable $createdAt;

    // #[ORM\Column(type: 'boolean')]
    // #[Groups(['quizSession:read'])] // 🔹 Only readable, cannot be modified by the user
    // private bool $used = false;

    // public function __construct(User $user)
    // {
    //     $this->user = $user;
    //     $this->createdAt = new \DateTimeImmutable();
    //     $this->used = false;
    // }

    // #[ORM\PrePersist] // 🔹 Automatically called before saving a new QuizSession
    // public function generateSessionToken(): void
    // {
    //     $this->sessionToken = bin2hex(random_bytes(16)); // 🔐 Secure random token
    // }

    // public function getSessionToken(): string
    // {
    //     return $this->sessionToken;
    // }

    // public function markAsUsed(): void
    // {
    //     $this->used = true;
    // }

    // public function isUsed(): bool
    // {
    //     return $this->used;
    // }

    // public function getUser(): User
    // {
    //     return $this->user;
    // }
}
