<?php
namespace Cloudways\Mymodule\Block;

use Magento\Framework\View\Element\Template;

class Weather extends Template
{
    public function getApiKey()
    {
        return "d3b0d50fecc0d12d2b2d1632218d01e4"; // Thay thế bằng API Key của bạn
    }

    public function getCity()
    {
        return "Hanoi"; // Bạn có thể thay đổi thành thành phố khác
    }

    public function getLang()
    {
        return "vi"; // Mã ngôn ngữ cho mô tả thời tiết
    }
}
