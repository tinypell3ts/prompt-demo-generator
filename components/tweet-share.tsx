import { Button } from "@/components/ui/button";
import { Twitter, ExternalLink } from "lucide-react";
import BaseWidget from "./base-widget";

interface TweetShareProps {
  tweetText: string;
  buttonText?: string;
  onTweetComplete?: (result: { success: boolean }) => void;
}

export default function TweetShare({ 
  tweetText, 
  buttonText = "Share on X", 
  onTweetComplete 
}: TweetShareProps) {
  const handleTweet = async () => {
    try {
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
      window.open(tweetUrl, "_blank");

      if (onTweetComplete) {
        onTweetComplete({ success: true });
      }
    } catch (error) {
      console.error("Tweet sharing failed", error);

      if (onTweetComplete) {
        onTweetComplete({ success: false });
      }
    }
  };

  return (
    <BaseWidget>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Twitter className="w-4 h-4 text-blue-400" />
          <h3 className="text-white font-medium text-sm">Share on Social</h3>
        </div>
        
        <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-800">
          <p className="text-gray-300 text-sm italic">"{tweetText}"</p>
        </div>
        
        <Button 
          onClick={handleTweet}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          {buttonText}
        </Button>
      </div>
    </BaseWidget>
  );
}