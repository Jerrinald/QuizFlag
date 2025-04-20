<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use App\Controller\ResetPasswordController;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    shortName: 'Reset',
    description: 'Reset password',
    normalizationContext: ['groups' => ['reset:read']],
    denormalizationContext: ['groups' => ['reset:write']],
    operations: [
        new Post(
            uriTemplate: '/reset-pass',
            controller: ResetPasswordController::class . '::resetPass',
        ),
    ],
)]
class ResetPass
{
    #[Groups(['reset:write'])]
    private string $token;

    #[Groups(['reset:write'])]
    private string $plainPassword;

    public function getToken(): string
    {
        return $this->token;
    }

    public function setToken(string $token): void
    {
        $this->token = $token;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): void
    {
        $this->plainPassword = $plainPassword;
    }
}