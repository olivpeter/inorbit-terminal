const { select, input } = require('@inquirer/prompts')

async function addGoal() {
    const goal = await input({ message: 'What is your goal?' })

    if (!goal) {
        console.log('⚠️ Please enter a goal')
        return
    }

    console.log(`✅ Added goal: ${goal}`)
}
async function start() {
    console.log('🔥 App is running')

    while (true) {
        const option = await select({
            message: 'InOrbit | What do you want to do?',
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
                await addGoal()
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

start()
