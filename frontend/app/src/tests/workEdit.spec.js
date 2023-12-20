import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import WorkEdit from '../components/admin/WorkEdit.vue' 
import Input from '../components/common/Input.vue'
import Textarea from '../components/common/Textarea.vue'
import PrimaryButton from '../components/common/PrimaryButton.vue'
import useWork from '../composable/useWork.ts'
import { useRouter, useRoute } from 'vue-router'

jest.mock('vue-router', () => ({
  useRouter: jest.fn(() => ({
    push: () => {},
  })),
  useRoute: jest.fn(() => ({
    params: { 
      id: 1
    }
  })),
}))
 
jest.mock('../composable/useWork.ts'); 

describe('Work編集画面', () => {
  const work = {
    value: {
      projectName: "",
      language: "",
      framework: "",
      tool: "",
      introduction: "",
      responsible: "",
      acquiredSkill: "",
    }
  }
  const initialWork = {
    value: {
      projectName: "project hoge",
      language: "go",
      framework: "echo",
      tool: "vs code",
      introduction: "cool app",
      responsible: "backend",
      acquiredSkill: "go vue",
    }
  }
  it('マウント時にgetWork()が呼ばれ、既存データでworkが初期化されること', async () => {
    const mockGetWork = jest.fn().mockResolvedValue(initialWork)
    useWork.mockImplementation(() => ({
      work: work,
      getWork: mockGetWork,
    }))

    const push = jest.fn()
    useRouter.mockImplementationOnce(() => ({
      push: push
    }))
    
    const wrapper = mount(WorkEdit)
    expect(mockGetWork).toHaveBeenCalled()

    //getWork()の処理完了を待つ
    await wrapper.vm.getWork();
    await nextTick()
    expect(wrapper.vm.work).toStrictEqual(initialWork)
  });
  it('work編集画面でworkの値が更新されること', async () => {
    const mockUpdateWork = jest.fn()
    const mockGetWork = jest.fn().mockResolvedValue(initialWork)
    useWork.mockImplementation(() => ({
      work: work,
      getWork: mockGetWork,
      updateWork: mockUpdateWork,
    }))
    const push = jest.fn();
    useRouter.mockImplementationOnce(() => ({
      push: push
    }))
    const wrapper = mount(WorkEdit)
    await nextTick()
    expect(wrapper.find("h2").text()).toBe("Work編集画面")
    expect(wrapper.find("button").text()).toBe("更新")
    expect(wrapper.find("#プロジェクト名").exists()).toBe(true);
    //プロジェクトを登録する
    await wrapper.find("#プロジェクト名").setValue("project1")
    await wrapper.find("#プロジェクト名").trigger("input")
    expect(wrapper.vm.work.value.projectName).toBe("project1")
    //登録処理
    wrapper.vm.v$.$validate = jest.fn().mockResolvedValue(true)
    await wrapper.find("button").trigger("click")
    expect(mockUpdateWork).toHaveBeenCalled()
  });
  it('正しい数の子コンポーネントが表示されること', async () => {
    const wrapper = mount(WorkEdit)
    const inputComponents = wrapper.findAllComponents(Input)
    const textareaComponents = wrapper.findAllComponents(Textarea)
    const primaryButtons = wrapper.findAllComponents(PrimaryButton)
    expect(inputComponents.length).toBe(4)
    expect(textareaComponents.length).toBe(3)
    expect(primaryButtons.length).toBe(1)
  });
});