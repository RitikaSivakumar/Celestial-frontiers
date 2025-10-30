
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users } from 'lucide-react';

export default function PeerSupportPage() {
  return (
    <div className="p-4 md:p-8 flex flex-col items-center justify-center min-h-full">
        <header className="text-center mb-12">
            <h1 className="text-4xl font-headline">Peer-to-Peer Support</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Connect with a community that understands. Share your journey, listen to others, and find strength in shared experiences. This is a safe space for mutual support.
            </p>
        </header>

        <Card className="w-full max-w-3xl text-center">
            <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full text-primary w-fit mb-4">
                    <Users className="w-12 h-12" />
                </div>
                <CardTitle className="font-headline">Community Forums</CardTitle>
                <CardDescription>Coming Soon</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    We are working on creating a dedicated space for you to connect with peers. Stay tuned for forums, group chats, and more.
                </p>
            </CardContent>
        </Card>
    </div>
  );
}
