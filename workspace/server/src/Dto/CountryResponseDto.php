<?php

namespace App\Dto;

use App\Entity\Appointment;
use App\Entity\PlanningDoctor as PlanningDoctorEntity;
use App\Entity\ProvisionEmployee;
use App\Entity\User as User;
use App\Model\Planning;
use Symfony\Component\Serializer\Annotation\Groups;

final class CountryResponseDto
{
    protected User $user;

}