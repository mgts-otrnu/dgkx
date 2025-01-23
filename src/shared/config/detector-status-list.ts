export const detectorStatusList = [
    {
        name: "Датчик влажности",
        statusDanger: "Недопустимо",
        statusNorm: "Допустимо"
    },
    {
        name: "Датчик задымления",
        statusDanger: "CO превышен ",
        statusNorm: "CO в норме"
    },
    {
        name: "Датчик контроля напряжения",
        statusDanger: "Недопустимо",
        statusNorm: "Допустимо"
    },
    {
        name: "Датчик протечки",
        statusDanger: "Протечка",
        statusNorm: "В норме"
    },
    {
        name: "Камера",
        statusDanger: "",
        statusNorm: ""
    },
    {
        name: "Датчик давления",
        statusDanger: ["Выше нормы", "Ниже нормы"],
        statusNorm: "Допустимо"
    },
    {
        name: "Датчик температуры",
        statusDanger: ["Выше нормы", "Ниже нормы"],
        statusNorm: "Допустимо"
    },
    {
        name: "Геркон",
        statusDanger: "Открыто",
        statusNorm: "Закрыто"
    },
    {
        name: "Заполнение мусоропровода",
        statusDanger: "Заполнен",
        statusNorm: "Допустимо"
    },
    {
        name: "Датчик нейтрали",
        statusDanger: "Недопустимо",
        statusNorm: "Допустимо"
    },
    {
        name: "Уровень воды",
        statusDanger: "Недопустимо",
        statusNorm: "Допустимо"
    },
    {
        name: "Считыватель QR",
        statusDanger: ["Удержание", "Взлом"],
        statusNorm: ["Открыто", "Закрыто"]
    }
];