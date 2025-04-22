
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type DirectorEmail = {
  email: string;
};

type OtherDirectorsFormData = {
  directorEmails: DirectorEmail[];
};

type OtherDirectorsStepProps = {
  onNext: (data: OtherDirectorsFormData) => void;
  onBack: () => void;
  onSkip: () => void;
};

const OtherDirectorsStep = ({ onNext, onBack, onSkip }: OtherDirectorsStepProps) => {
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const form = useForm<OtherDirectorsFormData>({
    defaultValues: {
      directorEmails: [{ email: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "directorEmails"
  });

  const addDirectorEmail = () => {
    append({ email: '' });
  };

  const handleSendInvites = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;
    
    setIsSending(true);
    
    // Simulate sending invites
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: "Invites Sent",
        description: "BVN consent requests have been sent to all directors.",
      });
      onNext(form.getValues());
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Invite Other Directors</h2>
        <p className="text-muted-foreground">
          If you have additional directors, send them a quick link to grant BVN consent.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`directorEmails.${index}.email`}
              rules={{ 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Input placeholder="director@company.com" {...field} />
                    </FormControl>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addDirectorEmail}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Director
          </Button>

          <div className="flex space-x-2 pt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onSkip}
              className="flex-1"
            >
              Skip
            </Button>
            <Button 
              type="button" 
              className="flex-1 bg-[#1E4FFF]"
              onClick={handleSendInvites}
              disabled={isSending || fields.some(f => !form.getValues(`directorEmails.${fields.indexOf(f)}.email`))}
            >
              {isSending ? 'Sending...' : 'Send Invites'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OtherDirectorsStep;
