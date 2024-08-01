import '@styles/globals.css';
import SessionProviderWrapper from '@components/SessionProviderWrapper';

export const metadata = {
  title: "The Weather App",
  description: "Weather Web App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='antialiased'>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
