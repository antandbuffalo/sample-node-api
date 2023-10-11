const cleanQuickNoteRequest = (request) => {
  const id =
    request && request.id && request.id.trim() !== "" ? request.id.trim() : "";
  const passcode =
    request && request.passcode && request.passcode.trim() !== ""
      ? request.passcode.trim()
      : "";
  const text =
    request && request.text && request.text.trim() !== ""
      ? request.text.trim()
      : "";
  return {
    id,
    passcode,
    text,
  };
};

const validateQuickNoteRequest = (request) => {
  if (!request) return false;
  if (request && !request.id) return false;
  return true;
};

const validateQuickNoteSyncRequest = (request) => {
  if (!request) return false;
  if (request && !request.passcode) return false;
  return true;
};

const validateGetPasscodeRequest = (request) => {
  if (!request) return false;
  if (request && !request.id) return false;
  return true;
};

const generateRandomNumber = (numberOfDigits) => {
  let randomNumber = "";
  let firstDigit = 0;
  while (firstDigit === 0) {
    firstDigit = Math.floor(Math.random() * 10);
  }

  for (let i = 0; i < numberOfDigits - 1; i++) {
    randomNumber = `${randomNumber}${Math.floor(Math.random() * 10)}`;
  }
  return `${firstDigit}${randomNumber}`;
};

module.exports = {
  cleanQuickNoteRequest,
  validateQuickNoteRequest,
  validateQuickNoteSyncRequest,
  validateGetPasscodeRequest,
  generateRandomNumber
};
