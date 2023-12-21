import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import About from '../components/admin/About.vue' 
import Input from '../components/common/Input.vue'
import Textarea from '../components/common/Textarea.vue'
import PrimaryButton from '../components/common/PrimaryButton.vue'
import useAbout from '../composable/useAbout.ts'
import { useRouter } from 'vue-router'

jest.mock('vue-router', () => ({
  useRouter: jest.fn(() => ({
    push: () => {},
  }))
}))
 
jest.mock('../composable/useAbout.ts'); 

describe('About登録/編集画面', () => {
  const about = {
    value: { 
      name: "",
      introduction: "",
      certification: "",
      speciality: "",
      experiences: "",
      strength: "",
    }
  }
  const initialAbout = {
    value: { 
      name: "alice",
      introduction: "hello",
      certification: "cool skill",
      speciality: "cool speciality",
      experiences: "cool experiences",
      strength: "cool strength",
    } 
  }
  const nilAbout = {
    value: {
      data: "nil"
    }
  }
  it('about登録画面でaboutの値が登録され、登録後ダッシュボードに遷移すること', async () => {
    const mockGetAbout = jest.fn().mockResolvedValue(nilAbout)
    const mockCreateAbout = jest.fn()
    useAbout.mockImplementation(() => ({
      about: about,
      getAbout: mockGetAbout,
      createAbout: mockCreateAbout,
    }))
    const push = jest.fn();
    useRouter.mockImplementationOnce(() => ({
      push: push
    }))
    const wrapper = mount(About)
    expect(mockGetAbout).toHaveBeenCalled()

    //getAbout()の処理完了を待つ
    await wrapper.vm.getAbout();
    await nextTick()
    expect(wrapper.vm.isNil).toBe(true)
    expect(wrapper.find("h2").text()).toBe("About登録画面")
    expect(wrapper.find("button").text()).toBe("登録")
    expect(wrapper.find("#名前").exists()).toBe(true);
    //名前を登録する
    await wrapper.find("#名前").setValue("bob")
    await wrapper.find("#名前").trigger("input")
    expect(wrapper.vm.about.value.name).toBe("bob")
    //登録処理
    wrapper.vm.onUpdate = jest.fn()
    wrapper.vm.v$.$validate = jest.fn().mockResolvedValue(true)
    await wrapper.find("button").trigger("click")
    expect(mockCreateAbout).toHaveBeenCalled()
    //adminDashboardに遷移すること
    await flushPromises()
    expect(push).toHaveBeenCalledWith({ name: 'adminDashboard' });
  });
  it('マウント時にgetAbout()が呼ばれ、既存データでaboutが初期化されること', async () => {
    const mockGetAbout = jest.fn().mockResolvedValue(initialAbout)
    useAbout.mockImplementation(() => ({
      about: about,
      getAbout: mockGetAbout,
    }))

    const push = jest.fn()
    useRouter.mockImplementationOnce(() => ({
      push: push
    }))
    
    const wrapper = mount(About)
    expect(mockGetAbout).toHaveBeenCalled()

    //getAbout()の処理完了を待つ
    await wrapper.vm.getAbout();
    await flushPromises()
    expect(wrapper.vm.about).toStrictEqual(initialAbout)
  });
  it('正しい数の子コンポーネントが表示されること', async () => {
    const wrapper = mount(About)
    const inputComponents = wrapper.findAllComponents(Input)
    const textareaComponents = wrapper.findAllComponents(Textarea)
    const primaryButtons = wrapper.findAllComponents(PrimaryButton)
    expect(inputComponents.length).toBe(3)
    expect(textareaComponents.length).toBe(3)
    expect(primaryButtons.length).toBe(1)
  });
  it('about編集画面でaboutの値が更新され、更新後にダッシュボードに遷移すること', async () => {
    const mockGetAbout = jest.fn().mockResolvedValue(initialAbout)
    const mockUpdateAbout = jest.fn()
    useAbout.mockImplementation(() => ({
      about: about,
      getAbout: mockGetAbout,
      updateAbout: mockUpdateAbout,
    }))
    const push = jest.fn();
    useRouter.mockImplementationOnce(() => ({
      push: push
    }))
    const wrapper = mount(About)
    expect(mockGetAbout).toHaveBeenCalled()

    //getAbout()の処理完了を待つ
    await wrapper.vm.getAbout();
    await nextTick()
    expect(wrapper.vm.isNil).toBe(false)
    expect(wrapper.find("h2").text()).toBe("About編集画面")
    expect(wrapper.find("button").text()).toBe("更新")
    expect(wrapper.find("#名前").exists()).toBe(true);
    //名前を更新する
    await wrapper.find("#名前").setValue("joe")
    await wrapper.find("#名前").trigger("input")
    expect(wrapper.vm.about.value.name).toBe("joe")
    //更新処理
    wrapper.vm.v$.$validate = jest.fn().mockResolvedValue(true)
    await wrapper.find("button").trigger("click")
    expect(mockUpdateAbout).toHaveBeenCalled()
    //adminDashboardに遷移すること
    await flushPromises()
    expect(push).toHaveBeenCalledWith({ name: 'adminDashboard' });
  });
});