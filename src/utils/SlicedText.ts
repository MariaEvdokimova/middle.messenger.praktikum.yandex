export const slisedText = (text: string): string => {
  let sliced = text.slice(0, 30);
  if (sliced.length < text.length) {
    sliced += '...';
  }
  return sliced;
};
