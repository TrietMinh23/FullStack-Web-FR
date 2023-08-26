export default function validatePhoneNumber(phoneNumber) {
  // Loại bỏ các ký tự không phải là số từ chuỗi số điện thoại
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

  // Kiểm tra nếu độ dài sau khi làm sạch là 10 (độ dài số điện thoại cơ bản)
  if (cleanedPhoneNumber.length === 10 || cleanedPhoneNumber.length === 11) {
    return true;
  }

  return false;
}
