<?php

namespace App\Controller;


use App\Entity\Country;

use phpDocumentor\Reflection\PseudoTypes\LowercaseString;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class CountryCheckController extends AbstractController
{

    private $serializer;

    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }

    public function checkCountry(Request $request): JsonResponse
    {
        // Get the JSON data from the request body
        $jsonData = $request->getContent();
        $data = json_decode($jsonData, true);

        $iso = strtolower($data['iso']);
        $countryResponse = $data['countryResponse'];

        // Load the ISO country names from the JSON file
        $isoCountryData = json_decode(file_get_contents(__DIR__ . '/../Data/isoCountryFr.json'), true);

        // Create a Country object
        $country = new Country();
        $country->setIso($iso);
        $country->setCountryResponse($countryResponse);
        $country->setCorrectName($isoCountryData[$iso] ?? 'Unknown');

        $isCorrect = isset($isoCountryData[$iso]) && $this->ignoreCharacters($isoCountryData[$iso]) === $this->ignoreCharacters($countryResponse);
        $country->setIsCorrect($isCorrect);

        // ✅ Serialize the Country object into JSON
        $jsonData = $this->serializer->serialize($country, 'json');

        return new JsonResponse($jsonData, Response::HTTP_OK, [], true);
    }

    private function ignoreCharacters(string $input): string
    {
        // Normalize and remove accents
        $normalized = preg_replace('/[^\w]/', '', iconv('UTF-8', 'ASCII//TRANSLIT', $input));
        // Convert to lowercase for case-insensitive comparison
        return strtolower($normalized);
    }

}