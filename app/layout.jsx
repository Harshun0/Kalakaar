import './globals.css';

export const metadata = {
    title: 'Kalakaar — Find the creators your brand deserves',
    description: 'Kalakaar is India\'s creator marketplace — brands discover and hire reels, YouTube, photography, UGC, podcast and music creators with transparent pricing and direct inquiries.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
            </head>
            <body>{children}</body>
        </html>
    );
}
