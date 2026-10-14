begin;
create index social_round_answers_user on private.social_round_answers(user_id);
create index study_groups_owner on public.study_groups(owner_id);
create index study_room_checklist_author on public.study_room_checklist(created_by);
create index study_room_resources_author on public.study_room_resources(created_by);
create index study_room_sessions_author on public.study_room_sessions(created_by);
commit;

