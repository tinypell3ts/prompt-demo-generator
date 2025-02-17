import { Button } from "@/components/ui/button";
import type React from "react";

interface TweetShareProps {
  tweetText: string;
  buttonText?: string;
  onTweetComplete?: (result: { success: boolean }) => void;
}

const TweetShare: React.FC<TweetShareProps> = ({ tweetText, buttonText = "Share on X", onTweetComplete }) => {
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
        onTweetComplete({
          success: false,
        });
      }
    }
  };

  return (
    <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleTweet}>
      {buttonText}
    </Button>
  );
};

export default TweetShare;
