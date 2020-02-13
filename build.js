const rollup = require('rollup')
const nodeResolve711 = require('node-resolve-7-1-1')
const nodeResolve710 = require('node-resolve-7-1-0')
const nodeResolve700 = require('node-resolve-7-0-0')
const path = require('path')
const jetpack = require('fs-jetpack')

const output = './output/output.js'

const file2Content = 'THIS IS FILE 2'

const test = async (name, input, plugins) => {
  await jetpack.dirAsync('./output', { empty: true })
  console.log('- Test : ' + name)


  try {
    const bundle = await rollup.rollup({ input, plugins })
    await bundle.write({
      format: 'cjs',
      file: output
    })
  } catch (err) {
    console.log('🚫 Build failed:', err)
    console.log('\n')
    return
  }

  const content = await jetpack.readAsync(output)

  if (content.includes(file2Content)) console.log('✅  Build was correct!')
  else console.log('❌  Build was incorrect :(')

  console.log('\n')
}

(async () => {
  await test(
    'Test node-resolve 7.1.1 with resolveOnly',
    path.resolve('./input/1.js'),
    [nodeResolve711({ resolveOnly: ['this_is_a_test'] })]
  )
  await test(
    'Test node-resolve 7.1.1 with only',
    path.resolve('./input/1.js'),
    [nodeResolve711({ only: ['this_is_a_test'] })]
  )
  await test(
    'Test node-resolve 7.1.1 with relative path',
    './input/1.js',
    [nodeResolve711({ resolveOnly: ['this_is_a_test'] })]
  )
  await test(
    'Test node-resolve 7.1.1 with no options',
    path.resolve('./input/1.js'),
    [nodeResolve711({})]
  )

  await test(
    'Test node-resolve 7.1.0 with resolveOnly',
    path.resolve('./input/1.js'),
    [nodeResolve710({ resolveOnly: ['this_is_a_test'] })]
  )
  await test(
    'Test node-resolve 7.1.0 with only',
    path.resolve('./input/1.js'),
    [nodeResolve710({ only: ['this_is_a_test'] })]
  )
  await test(
    'Test node-resolve 7.1.0 with relative path',
    './input/1.js',
    [nodeResolve710({ resolveOnly: ['this_is_a_test'] })]
  )
  await test(
    'Test node-resolve 7.1.0 with no options',
    path.resolve('./input/1.js'),
    [nodeResolve710({})]
  )

  await test(
    'Test node-resolve 7.0.0 with resolveOnly',
    path.resolve('./input/1.js'),
    [nodeResolve700({ resolveOnly: ['this_is_a_test'] })]
  )
  await test(
    'Test node-resolve 7.0.0 with only',
    path.resolve('./input/1.js'),
    [nodeResolve700({ only: ['this_is_a_test'] })]
  )
  await test(
    'Test node-resolve 7.0.0 with relative path',
    './input/1.js',
    [nodeResolve700({ resolveOnly: ['this_is_a_test'] })]
  )
  await test(
    'Test node-resolve 7.0.0 with no options',
    path.resolve('./input/1.js'),
    [nodeResolve700({})]
  )
})()
