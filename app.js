const { select } = require('@inquirer/prompts')

async function Start() {
    console.log('🔥 App is running')

    while (true) {
        const option = await select({
            message: 'Menu >',
            choices: [
                {
                    name: 'Add goal',
                    value: 'add',
                },
                {
                    name: 'List goals',
                    value: 'list',
                },
                {
                    name: 'Leave',
                    value: 'leave',
                },
            ],
        })

        switch (option) {
            case 'add':
                console.log('☑️ Added goal')
                break

            case 'list':
                console.log('🗒️ Listing all goals')
                break

            case 'leave':
                console.log('👋 Ok. See ya!')
                return
        }
    }
}

Start()
