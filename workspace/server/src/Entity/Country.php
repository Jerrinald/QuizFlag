<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use App\Controller\CountryCheckController;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    shortName: 'Country',
    description: 'Country manage',
    normalizationContext: ['groups' => ['country:read']],
    denormalizationContext: ['groups' => ['country:write']],
    operations: [
        new Post(
            uriTemplate: '/country-check',
            controller: CountryCheckController::class . '::checkCountry',
        ),
    ],
)]
class Country
{
    #[Groups(['country:read'])]
    private string $correctName;

    #[Groups(['country:read'])]
    private bool $isCorrect;

    #[Groups(['country:write', 'country:read'])]
    private string $countryResponse;

    #[Groups(['country:write', 'country:read'])]
    private string $iso;

    // Getters
    public function getCorrectName(): string
    {
        return $this->correctName;
    }

    public function getIsCorrect(): bool
    {
        return $this->isCorrect;
    }

    public function getCountryResponse(): string
    {
        return $this->countryResponse;
    }

    public function getIso(): string
    {
        return $this->iso;
    }

    // Setters
    public function setCorrectName(string $correctName): void
    {
        $this->correctName = $correctName;
    }

    public function setIsCorrect(bool $isCorrect): void
    {
        $this->isCorrect = $isCorrect;
    }

    public function setCountryResponse(string $countryResponse): void
    {
        $this->countryResponse = $countryResponse;
    }

    public function setIso(string $iso): void
    {
        $this->iso = $iso;
    }
}
