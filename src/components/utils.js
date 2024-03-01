export const downloadFile = (url) => {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = url;
  a.download = 'recorded.webm';
  a.click();
};

export const deleteFile = (url) => {
  window.URL.revokeObjectURL(url);
};
