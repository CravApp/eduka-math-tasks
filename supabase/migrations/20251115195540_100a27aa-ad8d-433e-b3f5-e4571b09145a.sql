-- Create tasks table for storing math tasks
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  instructions TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read tasks (public access)
CREATE POLICY "Anyone can view tasks"
  ON public.tasks
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow anyone to create tasks (public access)
CREATE POLICY "Anyone can create tasks"
  ON public.tasks
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create index for better performance on created_at
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON public.tasks(created_at DESC);