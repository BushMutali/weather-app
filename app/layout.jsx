import '@styles/globals.css';

export const metadata = {
  title: "The Weather App",
  description: "Weather Web App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
