<?php

namespace YourVendor\ZaloPay\Model\Api;

class ZaloPayApi
{
    protected $appId;
    protected $key1;
    protected $key2;
    protected $endpoint;

    public function __construct($appId, $key1, $key2, $endpoint)
    {
        $this->appId = $appId;
        $this->key1 = $key1;
        $this->key2 = $key2;
        $this->endpoint = $endpoint;
    }

    public function createOrder($orderId, $amount, $description)
    {
        $embedData = '{}';
        $items = '[]';

        $params = [
            'app_id' => $this->appId,
            'app_user' => 'testuser',
            'app_trans_id' => date("ymd") . "_" . $orderId,
            'app_time' => round(microtime(true) * 1000),
            'amount' => $amount,
            'description' => $description,
            'embed_data' => $embedData,
            'item' => $items,
            'bank_code' => 'zalopayapp',
        ];

        ksort($params);
        $data = '';
        foreach ($params as $key => $value) {
            $data .= $key . '=' . $value . '&';
        }
        $data = rtrim($data, '&');
        $params['mac'] = hash_hmac('sha256', $data, $this->key1);

        $ch = curl_init($this->endpoint);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        $response = curl_exec($ch);
        curl_close($ch);

        return json_decode($response, true);
    }
}
