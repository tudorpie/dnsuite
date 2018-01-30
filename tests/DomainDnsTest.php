<?php
/**
 * Created by PhpStorm.
 * User: tudor
 * Date: 30.01.2018
 * Time: 14:49
 */

namespace App\Tests;

use App\Entity\DomainDns;
use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;
class DomainDnsTest extends TestCase
{

    public function testGetName()
    {
         $client =  new Client();

         $response = $client->request('GET','http://localhost:8000/domain_dns');

         $this->assertEquals(200, $response->getStatusCode());


    }

    public function testSetName()
    {
        $client =  new Client();


        $randName = 'Nameserver'.rand(0,999);


        //POST
        $response = $client->request('POST','http://localhost:8000/domain_dns',[
            'json' => ['name' =>  $randName]
        ]);

        $this->assertEquals(201, $response->getStatusCode());

        $contents = json_decode($response->getBody()->getContents(),true);

        $id = $contents['id'];
        $name = $contents['name'];
        $this->assertEquals($name, $randName);

        //PUT

        $testName = "Alternative";

        $response = $client->request('PUT','http://localhost:8000/domain_dns/'.$id,[
            'json' => ['name' =>  $testName]
        ]);

        $this->assertEquals(200, $response->getStatusCode());
        $contents = json_decode($response->getBody()->getContents(),true);

        $name = $contents['name'];
        $this->assertEquals($name, $testName);



        //DELETE

        $response = $client->request('DELETE','http://localhost:8000/domain_dns/'.$id);
        $this->assertEquals(204, $response->getStatusCode());



    }

}
