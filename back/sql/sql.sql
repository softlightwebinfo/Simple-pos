create table users
(
    id         bigserial                              not null
        constraint users_pk
            primary key,
    email      varchar(250)                           not null,
    updated_at timestamp with time zone default now() not null,
    created_at timestamp with time zone default now() not null,
    name       varchar(100)                           not null,
    active     boolean                  default true  not null,
    password   varchar(200)                           not null
);

alter table users
    owner to postgres;

create index users_id_idx
    on users (id);

create table pages
(
    page varchar(100) not null
        constraint pages_pk
            primary key
);

alter table pages
    owner to postgres;

create index pages_page_idx
    on pages (page);

create table banners
(
    id       serial       not null
        constraint banners_pk
            primary key,
    title    varchar(100) not null,
    subtitle varchar(250),
    route    varchar(100),
    button   varchar(100),
    image    varchar(255) not null,
    page     varchar(100) not null
        constraint banners_fk
            references pages
            on update cascade on delete cascade,
    active   boolean default true
);

alter table banners
    owner to postgres;

create index banners_id_idx
    on banners (id);

create index banners_page_idx
    on banners (page);

create table studios
(
    id          bigserial                              not null
        constraint studios_pk
            primary key,
    title       varchar(100)                           not null,
    description text                                   not null,
    size        varchar(50)                            not null,
    capacity    integer                  default 1,
    price_from  numeric                  default 0.0,
    active      boolean                  default true,
    created_at  timestamp with time zone default now() not null,
    updated_at  timestamp with time zone default now()
);

alter table studios
    owner to postgres;

create table studios_prices
(
    fk_studio   bigint              not null
        constraint studios_prices_studios_id_fk
            references studios
            on update cascade on delete cascade,
    id          bigint              not null,
    description text                not null,
    price       numeric default 0.0 not null,
    ishour      boolean default false,
    title       varchar(100),
    constraint studios_prices_pk
        primary key (fk_studio, id)
);

alter table studios_prices
    owner to postgres;

create index studios_prices_fk_studio_id_index
    on studios_prices (fk_studio, id);

create table studios_images
(
    fk_studio bigserial    not null
        constraint studios_images_studios_id_fk
            references studios
            on update cascade on delete cascade,
    image     varchar(100) not null,
    constraint studios_images_pk
        primary key (fk_studio, image)
);

alter table studios_images
    owner to postgres;

create index studios_images_fk_studio_image_index
    on studios_images (fk_studio, image);

-- auto-generated definition
create table contacts
(
    id         bigserial                              not null,
    username   varchar(100)                           not null,
    email      varchar(200)                           not null,
    message    text                                   not null,
    phone      varchar(20)                            not null,
    created_at timestamp with time zone default now() not null
);

alter table contacts
    owner to postgres;

-- auto-generated definition
create table streams
(
    id          bigserial                              not null
        constraint streams_pk
            primary key,
    title       varchar(100)                           not null,
    description text                                   not null,
    created_at  timestamp with time zone default now() not null,
    video       varchar(20),
    st_views    integer                  default 0,
    st_clicks   integer                  default 0,
    st_likes    integer                  default 0,
    st_dislikes integer                  default 0
);

alter table streams
    owner to postgres;

create index streams_id_index
    on streams (id);

