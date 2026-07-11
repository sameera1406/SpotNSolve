insert into storage.buckets(id,name,public)

values(

'issue-images',

'issue-images',

true

)

on conflict(id)

do nothing;