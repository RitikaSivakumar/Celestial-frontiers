import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookHeart } from "lucide-react";

export default function DiaryPage() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-headline mb-8">My Diary</h1>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground h-64">
          <BookHeart className="w-16 h-16 mb-4" />
          <p>A dedicated space to browse all your past diary entries is on its way!</p>
        </CardContent>
      </Card>
    </div>
  );
}
