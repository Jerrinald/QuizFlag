<?php

namespace App\Doctrine;

use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use App\Entity\Appointment;
use App\Entity\Offer;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bundle\SecurityBundle\Security;

final class RankingUserExtension implements QueryCollectionExtensionInterface
{

    public function applyToCollection(
        QueryBuilder $queryBuilder, 
        QueryNameGeneratorInterface $queryNameGenerator, 
        string $resourceClass, 
        ?Operation $operation = null,
        array $context = []
    ): void {
        if ($resourceClass === User::class && $operation?->getName() === 'users_rank') { 
            $this->addRankingFilter($queryBuilder);
        }
    }

    private function addRankingFilter(QueryBuilder $queryBuilder): void
    {
        // Order by bestScore in descending order
        $queryBuilder->andWhere("o.bestScore > 0");
        $queryBuilder->orderBy('o.bestScore', 'DESC');
        $queryBuilder->setMaxResults(10);
    }
}