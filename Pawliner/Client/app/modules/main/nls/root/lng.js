define({
    modules:{
        main:{
            views: {
                index:{
                    logo_mini_first_part: "m",
                    logo_mini_second_part: "AT",
                    logo_standard: "Materials",
                    toggle_navigation: "Toggle navigation",
                    soft_label: "Welcome",
                    load_data_pls: "Please waiting load data...",
                    home: "Home",
                },
                user:{
                    status: "Active"
                },
                north:{
                    menu: {
                        profile: "Profile",
                        exit: "Sign out"
                    },
                    users_lasttime: "Последний вход"
                },
                west:{
                    connectStatusTextOff: 'Offline',
                    connectStatusTextOn: 'Online' 
                },
                profile: {
                    label: 'Profile',
                    user: 'User',
                    users_fio: 'ФИО (используется для отображения в колонтитуле при печати документов)',
                    users_jobtitle: 'Должность',
                    users_structureorganization: 'Подразделение',
                    users_numofice: '№ комнаты',
                    users_tel: 'Телефон',
                    users_telint: 'Телефон внут.',
                    users_note: 'Описание',
                    users_email: 'E-mail (используется как имя пользователя при авторизации)',
                    users_password: 'Пароль',
                    users_password2: 'Пароль повторить',
                    button: 'Save',
                    placeholder: {
                        users_fio: 'Example: Иванов Иван Иванович',
                        users_jobtitle: 'Example: Ведущий инженер',
                        users_structureorganization: 'Example: Отдел стандартизации',
                        users_numofice: 'Example: 705',
                        users_tel: 'Example: +375 17 2696911',
                        users_telint: 'Example: 911',
                        users_note: '',
                        users_email: 'Example: ivanov@example.by',
                        users_password: 'Введите пароль для информационной системы.',
                        users_password2: 'Введите повторно пароль для информационной системы.',
                    }
                },
                login: {
                    label: 'Sign in to start your session',
                    autologin: 'Remember Me',
                    signinbutton: 'Sign In',
                    placeholder: {
                        buyers_email: 'E-mail',
                        buyers_password: 'Password',
                    }
                },
                settings: {
                    label: 'Settings',
                    autologin: 'Remember password',
                    savebutton: 'Save',
                    minutes: 'minutes'
                }
            },
        },
    },
    common:{
        paginator:{
            first: "First",
            last: "Last",
            previous: "Previous",
            next: "Next"
        },
        menu:{
            "!/index": "Home",
            "!/main/pages/contacts": "Contacts",
            "!/main/settings": "Settings",
            "!/main/pages/about": "About",
        },
    },
    labels: {
        title: 'Materials',
        brand: "Materials",
        error: "Error",
    },
//    menu: {
//        index: "Home",
//        home: "Home",
//        help: "Help",
//        contacts: "Contacts",
//        about: "About",
//    },
    ModalLabel: [
        {item: "error", text: "Error"},
        {item: "message", text: "Message"}
    ],
    messages: {
        done: "Done",
        loading: "Loading data...",
    },
    errors: {
        noData: "no data",
        unknown: "Unknown error"
    },
});