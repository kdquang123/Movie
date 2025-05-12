using System;

namespace Movie.Core.Models;

public class VNPayCallbackModel
{
    public string vnp_Amount { get; set; }
    public string vnp_BankCode { get; set; }
    public string vnp_BankTranNo { get; set; }
    public string vnp_CardType { get; set; }
    public string vnp_OrderInfo { get; set; }
    public string vnp_PayDate { get; set; }
    public string vnp_ResponseCode { get; set; }
    public string vnp_TmnCode { get; set; }
    public string vnp_TransactionNo { get; set; }
    public string vnp_TxnRef { get; set; } // Mã đơn hàng của bạn
    public string vnp_SecureHash { get; set; } // Chuỗi hash dùng để xác thực
    public string vnp_TransactionStatus { get; set; } // Trạng thái giao dịch
}
