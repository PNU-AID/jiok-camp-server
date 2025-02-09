export default function getIsMobile() {
  const userAgent = window.navigator.userAgent;
  console.log(userAgent);
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|Macintosh|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    );
  return isMobile;
}
