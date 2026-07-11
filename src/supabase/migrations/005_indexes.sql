create index if not exists idx_issue_status
on issues(status);

create index if not exists idx_issue_user
on issues(user_id);

create index if not exists idx_issue_category
on issues(category_id);

create index if not exists idx_comment_issue
on comments(issue_id);

create index if not exists idx_vote_issue
on votes(issue_id);