const { Sequelize } = require("sequelize")
const bcrypt = require("bcrypt")
const DB_NAME = process.env.DB_NAME || "odeone"
const DB_USER = process.env.DB_USER || "odeone"
const DB_PASS = process.env.DB_PASS || "test1234"

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: "db",
    dialect: "postgres",
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

const Sessions = sequelize.define("sessions", {
    id_user: {
        type: Sequelize.INTEGER,
        references: {
            model: Users,
            key: "id_user"
        }
    },
    refresh: {
        type: Sequelize.STRING,
        unique: true
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
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    video_path: {
        type: Sequelize.STRING,
        allowNull: true
    },
    sub_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'summaries',
            key: 'id_summary'
        }
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
        },
        onDelete: 'CASCADE'
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
        },
        onDelete: 'CASCADE'
    }
})

// Définir les relations après avoir défini tous les modèles
Summaries.hasMany(Summaries, {
    as: 'subContent',
    foreignKey: 'sub_id',
    onDelete: 'CASCADE'
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
    },
    search_vector: {
        type: Sequelize.TSVECTOR,
        allowNull: true
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

sequelize.sync().then(async () => {
    // Création de l'extension et des index
    await sequelize.query(`
        CREATE EXTENSION IF NOT EXISTS pg_trgm;
        CREATE INDEX IF NOT EXISTS faqs_question_trgm_idx ON faqs USING gist (question gist_trgm_ops);
        CREATE INDEX IF NOT EXISTS faqs_answer_trgm_idx ON faqs USING gist (answer gist_trgm_ops);
    `);
    
    sequelize.query(`
        CREATE OR REPLACE FUNCTION faqs_search_vector_update() RETURNS trigger AS $$
        BEGIN
            NEW.search_vector = 
                setweight(to_tsvector('french', coalesce(NEW.question, '')), 'A') ||
                setweight(to_tsvector('french', coalesce(NEW.answer, '')), 'B');
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    
        DROP TRIGGER IF EXISTS faqs_search_vector_trigger ON faqs;
        
        CREATE TRIGGER faqs_search_vector_trigger
        BEFORE INSERT OR UPDATE ON faqs
        FOR EACH ROW EXECUTE FUNCTION faqs_search_vector_update();
    `);

    await Roles.upsert({
        title: "unverified",
        weight: 0
    })
    await Roles.upsert({
        title: "verified",
        weight: 1
    })
    await Roles.upsert({
        title: "administrator",
        weight: 666
    })

    await Genders.upsert({
        title: "not-specified"
    })

    await Genders.upsert({
        title: "female"
    })

    await Genders.upsert({
        title: "male"
    })


    await Users.upsert({
        main_email: "admin@odeone.com",
        firstname: "Admin",
        lastname: "Admin",
        company: "OdeOne",
        telephone: "0000000000",
        password: bcrypt.hashSync("admin", 10),
        id_role: 3,
        id_gender: 1
    })
    console.log("DB sync success.")
}).catch((err) => {
    console.error("Error on DB sync : ", err)
})

module.exports = {
    Users,
    Sessions,
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