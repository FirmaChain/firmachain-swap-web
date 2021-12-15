export const convertNumber = (value: string | number) => {
  if (isNaN(Number(value))) return 0;

  return Number(value);
};

export const copyToClipboard = (textToCopy: string) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(textToCopy);
    } else {
      let textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      textArea.style.position = "absolute";
      textArea.style.opacity = "0";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      return new Promise((res: any, rej: any) => {
        document.execCommand("copy") ? res() : rej();
        textArea.remove();
      });
    }
  } catch (e) {}
};
