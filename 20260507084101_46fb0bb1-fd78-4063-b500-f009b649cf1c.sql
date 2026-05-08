
ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.set_employee_code() SET search_path = public;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_employee_code() FROM PUBLIC, anon, authenticated;
