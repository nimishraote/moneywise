-- Supabase Data API grants, added before the October 30, 2026 default-grant change.
-- Existing production tables keep their current grants. This migration makes the
-- intended privileges explicit and preserves them for future tables created by
-- Supabase migrations / SQL editor under the postgres role.

grant usage on schema public to authenticated, service_role;

do $$
begin
  if to_regclass('public.moneywise_profiles') is not null then
    grant select, insert, update on public.moneywise_profiles to authenticated;
    grant all privileges on public.moneywise_profiles to service_role;
  end if;

  if to_regclass('public.moneywise_assessments') is not null then
    grant select, insert, update on public.moneywise_assessments to authenticated;
    grant all privileges on public.moneywise_assessments to service_role;
  end if;

  if to_regclass('public.moneywise_progress') is not null then
    grant select, insert, update on public.moneywise_progress to authenticated;
    grant all privileges on public.moneywise_progress to service_role;
  end if;
end
$$;

-- Future MoneyWise tables created by the normal Supabase migration owner.
alter default privileges for role postgres in schema public
  grant select, insert, update on tables to authenticated;

alter default privileges for role postgres in schema public
  grant all privileges on tables to service_role;

-- Future identity/serial columns need sequence access for inserts.
alter default privileges for role postgres in schema public
  grant usage, select on sequences to authenticated;

alter default privileges for role postgres in schema public
  grant all privileges on sequences to service_role;

-- Intentionally no anon grants: MoneyWise data is user-specific and the app
-- performs these reads/writes only after authentication. RLS remains the
-- row-level security boundary and should be defined for every user-data table.
