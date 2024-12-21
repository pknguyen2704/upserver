<?php

namespace YourVendor\ZaloPay\Controller\Callback;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;

class Index extends Action
{
    public function execute()
    {
        $response = file_get_contents('php://input');
        $data = json_decode($response, true);

        if ($data['return_code'] == 1) {
            // Xử lý đơn hàng thành công
            echo "Giao dịch thành công!";
        } else {
            // Xử lý đơn hàng thất bại
            echo "Giao dịch thất bại!";
        }
    }
}
