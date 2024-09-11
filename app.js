const { select, input, checkbox } = require('@inquirer/prompts')

let goals = [{ value: 'Learn Javascript', checked: false }]

async function addGoal() {
    const goal = await input({ message: 'What is your goal?' })

    if (!goal) {
        console.log('⚠️ Please enter a goal')
        return
    }

    goals.push({ value: goal, checked: false })

    console.log(`✅ Added goal: ${goal}`)
}

async function listGoals() {
    const answers = await checkbox({
        message: 'Select the goals you want to complete:',
        choices: [...goals],
        instructions: false,
    })

    goals.forEach((g) => {
        g.checked = false
    })

    if (answers.length == 0) {
        console.log('⚠️ No goals were selected')
        return
    }

    answers.forEach((answer) => {
        const goal = goals.find((g) => {
            return g.value == answer
        })

        goal.checked = true
    })

    console.log('✅ Goal(s) marked as completed')
}

async function openGoals() {
    const open = goals.filter((goal) => {
        return !goal.checked
    })

    if (open.length == 0) {
        console.log('🥳 No goals are open')
        return
    }

    await select({
        message: `Open goals: (${open.length})`,
        choices: [...open],
    })
}

async function completedGoals() {
    const completed = goals.filter((goal) => {
        return goal.checked
    })

    if (completed.length == 0) {
        console.log('😒 No goals were completed')
        return
    }

    await select({
        message: `Completed goals: (${completed.length})`,
        choices: [...completed],
    })
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
                    name: 'Open goals',
                    value: 'open',
                },
                {
                    name: 'Goals completed',
                    value: 'completed',
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
                await listGoals()
                break

            case 'open':
                await openGoals()
                break

            case 'completed':
                await completedGoals()
                break

            case 'leave':
                console.log('👋 Ok. See ya!')
                return
        }
    }
}

start()
