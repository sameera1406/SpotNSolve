insert into categories(name)

values

('Road Damage'),

('Street Lights'),

('Garbage'),

('Water Supply'),

('Drainage'),

('Electricity'),

('Traffic'),

('Public Safety'),

('Others')

on conflict(name) do nothing;