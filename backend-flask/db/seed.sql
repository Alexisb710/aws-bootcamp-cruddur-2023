-- this file was manually created
INSERT INTO public.users (display_name, email, handle, cognito_user_id)
VALUES
  ('Alexis Bustos', 'b.alexis10@yahoo.com', 'alexisbustos' ,'MOCK'),
  ('Andrew Brown', 'andrew@exampro.co', 'andrewbrown' ,'MOCK');

INSERT INTO public.activities (user_uuid, message, expires_at)
VALUES
  (
    (SELECT uuid from public.users WHERE users.handle = 'alexisbustos' LIMIT 1),
    'This was imported as seed data!',
    current_timestamp + interval '10 day'
  )