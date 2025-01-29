export function generatePassword() {
  const length = 10;  
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const specialChars = "!@#$%^&*()";
  const allChars = uppercase + lowercase + digits + specialChars;

  let password = "";
  
  // Ensure at least one character from each required category
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += digits[Math.floor(Math.random() * digits.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Fill the rest of the password length with random characters
  for (let i = 3; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to avoid predictable patterns
  password = password.split("").sort(() => 0.5 - Math.random()).join("");

  return password;
}