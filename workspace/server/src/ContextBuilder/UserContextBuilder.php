<?php

namespace App\ContextBuilder;

use ApiPlatform\State\SerializerContextBuilderInterface;
use App\Entity\User;
use App\Enum\Groups\UserGroupsEnum;
use App\Enum\RolesEnum;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\Attribute\AsDecorator;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\DependencyInjection\Attribute\AutowireDecorated;
use Symfony\Component\HttpFoundation\Request;

#[AsDecorator('api_platform.serializer.context_builder')]
final class UserContextBuilder implements SerializerContextBuilderInterface
{

    private $decorated;
    private $authorizationChecker;

    public function __construct(SerializerContextBuilderInterface $decorated, AuthorizationCheckerInterface $authorizationChecker,
    protected Security $security,)
    {
        $this->decorated = $decorated;
        $this->authorizationChecker = $authorizationChecker;
    }

    public function createFromRequest(Request $request, bool $normalization, array $extractedAttributes = null): array
    {
        $context = $this->decorated->createFromRequest($request, $normalization, $extractedAttributes);
        $resourceClass = $context['resource_class'] ?? null;

        // If no groups is defined or if we are in denormalization mode (json -> to object)
        if (!isset($context['groups']) || false === $normalization) {
            return $context;
        }

        if ($resourceClass !== User::class) {
            return $context;
        } 

        if ($this->authorizationChecker->isGranted('ROLE_ADMIN')) {
            $context['groups'][] = 'user:read:full';
        }

        

        return $context;
    }
}