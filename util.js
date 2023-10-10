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

module.exports = {
  cleanQuickNoteRequest,
  validateQuickNoteRequest,
  validateQuickNoteSyncRequest,
  validateGetPasscodeRequest,
};
