const { Sequelize } = require("sequelize")

const DB_NAME = process.env.DB_NAME || "odeone"
const DB_USER = process.env.DB_USER || "odeone"
const DB_PASS = process.env.DB_PASS || "test1234"

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: "db",
    dialect: "postgres"
})

sequelize.authenticate().then(() => {
    console.log("DB connection success.")
}).catch((err) => {
    console.error("Unable to connect to DB : ", err)
})

const Roles = sequelize.define("roles", {
    id_role: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    weight: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

const Genders = sequelize.define("genders", {
    id_gender: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    title : {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

const Users = sequelize.define("users", {
    id_user: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    main_email: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    secondary_email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    company: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    telephone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    verify_id: {
        type: Sequelize.INTEGER,
        unique: true
    },
    id_role: {
        type: Sequelize.INTEGER,
        references: {
            model: Roles,
            key: "id_role"
        }
    },
    id_gender: {
        type: Sequelize.INTEGER,
        references: {
            model: Genders,
            key: "id_gender"
        }
    }
})

const Summaries = sequelize.define("summaries", {
    id_summary: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    sub_id: {
        type: Sequelize.INTEGER,
        unique: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    video_path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

const SummaryCreatedAt = sequelize.define("summary_created_at", {
    created_at: {
        type: Sequelize.DATE,
        allowNull: false
    },
    id_user: {
        type: Sequelize.INTEGER,
        references: {
            model: Users,
            key: "id_user"
        }
    },
    id_summary: {
        type: Sequelize.INTEGER,
        references: {
            model: Summaries,
            key: "id_summary"
        }
    }
})

const SummaryModifiedAt = sequelize.define("summary_modified_at", {
    modified_at: {
        type: Sequelize.DATE
    },
    id_user: {
        type: Sequelize.INTEGER,
        references: {
            model: Users,
            key: "id_user"
        }
    },
    id_summary: {
        type: Sequelize.INTEGER,
        references: {
            model: Summaries,
            key: "id_summary"
        }
    }
})

const Faqs = sequelize.define("faqs", {
    id_faq: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    question: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    answer: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const FaqCreatedAt = sequelize.define("faq_created_at", {
    created_at: {
        type: Sequelize.DATE,
        allowNull: false
    },
    id_user: {
        type: Sequelize.INTEGER,
        references: {
            model: Users,
            key: "id_user"
        }
    },
    id_faq: {
        type: Sequelize.INTEGER,
        references: {
            model: Faqs,
            key: "id_faq"
        }
    }
})

const FaqModifiedAt = sequelize.define("faq_modified_at", {
    modified_at: {
        type: Sequelize.DATE
    },
    id_user: {
        type: Sequelize.INTEGER,
        references: {
            model: Users,
            key: "id_user"
        }
    },
    id_faq: {
        type: Sequelize.INTEGER,
        references: {
            model: Faqs,
            key: "id_faq"
        }
    }
})

const Tutorials = sequelize.define("tutorials", {
    id_tutorial: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    content_path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    display_order: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

const TutorialCreatedAt = sequelize.define("tutorial_created_at", {
    created_at: {
        type: Sequelize.DATE,
        allowNull: false
    },
    id_user: {
        type: Sequelize.INTEGER,
        references: {
            model: Users,
            key: "id_user"
        }
    },
    id_tutorial: {
        type: Sequelize.INTEGER,
        references: {
            model: Tutorials,
            key: "id_tutorial"
        }
    }
})

const TutorialModifiedAt = sequelize.define("tutorial_modified_at", {
    modified_at: {
        type: Sequelize.DATE
    },
    id_user: {
        type: Sequelize.INTEGER,
        references: {
            model: Users,
            key: "id_user"
        }
    },
    id_tutorial: {
        type: Sequelize.INTEGER,
        references: {
            model: Tutorials,
            key: "id_tutorial"
        }
    }
})

const Functions = sequelize.define("functions", {
    id_function: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const FunctionCreatedAt = sequelize.define("function_created_at", {
    created_at: {
        type: Sequelize.DATE,
        allowNull: false
    },
    id_user: {
        type: Sequelize.INTEGER,
        references: {
            model: Users,
            key: "id_user"
        }
    },
    id_function: {
        type: Sequelize.INTEGER,
        references: {
            model: Functions,
            key: "id_function"
        }
    }
})

const FunctionModifiedAt = sequelize.define("function_modified_at", {
    modified_at: {
        type: Sequelize.DATE
    },
    id_user: {
        type: Sequelize.INTEGER,
        references: {
            model: Users,
            key: "id_user"
        }
    },
    id_function: {
        type: Sequelize.INTEGER,
        references: {
            model: Functions,
            key: "id_function"
        }
    }
})

sequelize.sync({ force: true }).then(async () => {
    await Roles.create({
        title: "unverified",
        weight: 0
    })
    await Roles.create({
        title: "verified",
        weight: 1
    })
    await Roles.create({
        title: "administrator",
        weight: 666
    })

    await Genders.create({
        title: "not-specified"
    })

    await Genders.create({
        title: "female"
    })

    await Genders.create({
        title: "male"
    })

    console.log("DB sync success.")
}).catch((err) => {
    console.error("Error on DB sync : ", err)
})

module.exports = {
    Users,
    Roles,
    Genders,
    Faqs,
    FaqCreatedAt,
    FaqModifiedAt,
    Summaries,
    SummaryCreatedAt,
    SummaryModifiedAt,
    Functions,
    FunctionCreatedAt,
    FunctionModifiedAt,
    Tutorials,
    TutorialCreatedAt,
    TutorialModifiedAt
}