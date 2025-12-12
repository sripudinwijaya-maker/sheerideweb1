export const metadata = {
  title: "SheerID Simple Verify",
  description: "Mode 2 - No OAuth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
