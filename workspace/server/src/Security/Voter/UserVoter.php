<?php

namespace App\Security\Voter;

use App\Entity\User;
use App\Enum\RolesEnum;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class UserVoter extends Voter
{
    public const EDIT = 'USER_EDIT';
    public const VIEW = 'USER_VIEW';
    public const VIEWALL = 'USER_VIEWALL';
    public const EDIT_ROLES = 'USER_EDIT_ROLES';
    public const DELETE = 'USER_DELETE';
    public const POST = 'USER_POST';

    public function __construct(private Security $security)
    {
    }

    protected function supports(string $attribute, mixed $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::EDIT, self::VIEW, self::VIEWALL, self::EDIT_ROLES, self::DELETE, self::POST])
        && ($subject instanceof User || $subject === null);
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        if ($attribute === self::POST) {
            return $this->security->isGranted('ROLE_ADMIN');
        }
        
        assert($subject instanceof User);
        

        // ... (check conditions and return true to grant permission) ...
        switch ($attribute) {
            case self::EDIT:
                // logic to determine if the user can EDIT
                // return true or false
                
                if ($subject === $user || $this->security->isGranted('ROLE_ADMIN')) {
                    return true;
                } else {
                    return false;
                }
                break;
            case self::EDIT_ROLES:
                return $this->security->isGranted('ROLE_ADMIN');
                break;
            case self::DELETE:
                return $this->security->isGranted('ROLE_ADMIN');
                break;
            case self::POST:
                dump($this->security->isGranted('ROLE_ADMIN'));
                return $this->security->isGranted('ROLE_ADMIN');
                break;
        }

        return false;
    }
}
