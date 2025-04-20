<?php

namespace App\EventSubscriber;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;

#[AsEventListener(event: "lexik_jwt_authentication.on_jwt_created", method: 'onJWTCreated')]
final class JWTCreatedListener
{
    public function onJWTCreated(JWTCreatedEvent $event): void
    {
        $payload = $event->getData();

        /** @var User $user */
        $user = $event->getUser();

        $payload['username'] = $user->getUsername();
        $payload['bestScore'] = $user->getBestScore();
        $payload['id'] = $user->getId();

        $event->setData($payload);
    }
}
