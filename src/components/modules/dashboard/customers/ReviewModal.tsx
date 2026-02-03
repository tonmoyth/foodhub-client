"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { submitReview } from "@/actions/meals.action";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealId: string;
  orderId: string;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  mealId,
  orderId,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    const formData = new FormData();
    formData.append("mealId", mealId);
    formData.append("orderId", orderId);
    formData.append("rating", rating.toString());
    formData.append("comment", comment);

    const result = await submitReview(formData);
    if (result.success) {
      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
      onClose();
    } else {
      toast.error(result.message || "Failed to submit review. Try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle>Leave a Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Star Rating */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`text-3xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>

          {/* Comment */}
          <Textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />

          {/* Buttons */}
          <div className="flex gap-2">
            <Button className="flex-1" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewModal;
