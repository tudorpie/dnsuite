<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DomainNameRepository")
 * @ApiResource(attributes={"filters"={"offer.search_filter"}})
 */
class DomainName
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;
    /**
     * @var string The name of the record.
     *
     * @ORM\Column
     * @Assert\NotBlank()
     */
    private $name;
    /**
     * @var string The type of the record [ A, CNAME, MX, ... ]
     *
     * @Assert\NotBlank()
     * @ORM\Column
     */
    private $type;
    /**
     * @var string The value of the record
     *
     * @Assert\NotBlank()
     * @Assert\Ip()
     * @ORM\Column
     */
    private $value;

    /**
     * @var integer The id
     *
     * @Assert\NotBlank()
     * @ORM\ManyToOne(targetEntity="App\Entity\DomainDns")
     * @ORM\JoinColumn(onDelete="CASCADE")
     */
    private $domainDns;

    /**
     * @return mixed
     */
    public function getDomainDns()
    {
        return $this->domainDns;
    }

    /**
     * @param mixed $domainDns
     */
    public function setDomainDns($domainDns): void
    {
        $this->domainDns = $domainDns;
    }


    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }



    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @param string $type
     */
    public function setType(string $type): void
    {
        $this->type = $type;
    }

    /**
     * @return string
     */
    public function getValue(): string
    {
        return $this->value;
    }

    /**
     * @param string $value
     */
    public function setValue(string $value): void
    {
        $this->value = $value;
    }
}
