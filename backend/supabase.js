const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://bvlcdseawnvuabwtqord.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2bGNkc2Vhd252dWFid3Rxb3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NzAyMzksImV4cCI6MjA1ODU0NjIzOX0.kA5Alvn9zmBRypyVrykWiU3z-wySXk7AGtEbFYDC5OA';
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
